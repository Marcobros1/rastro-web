import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCreateListingMutation } from "../../app/api";
import { getErrorMessage } from "../../app/apiError";
import { useCurrentUser } from "../../features/users/CurrentUserContext";
import { CATEGORY_LABELS } from "../../app/labels";

const listingSchema = z.object({
  title: z.string().trim().min(1, "El título no puede estar vacío."),
  description: z.string().trim().min(1, "La descripción no puede estar vacía."),
  city: z.string().trim().min(1, "La ciudad no puede estar vacía."),
  price: z
    .number()
    .min(0, "El precio no puede ser negativo")
    .refine((n) => !isNaN(n), "El precio tiene que ser un número."),
  category: z.string().min(1, "Elige una categoría."),
});

type ListingFormData = z.infer<typeof listingSchema>;

export function NewListingPage() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const [createListing, { isLoading }] = useCreateListingMutation();
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<Record<string, string> | null>(null);

  const [data, setData] = useState<ListingFormData>({
    title: "",
    description: "",
    city: "",
    price: 0,
    category: "",
  });

  function handleChange(field: keyof ListingFormData, value: string | number) {
    setData({ ...data, [field]: value });
    setFormError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFormError(null);
    const result = listingSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        if (issue.path[0]) {
          fieldErrors[String(issue.path[0])] = issue.message;
        }
      }
      setFormError(fieldErrors);
      return;
    }
    try {
      const created = await createListing({
        ...data,
        status: "AVAILABLE",
        views: 0,
        publishedAt: new Date().toISOString(),
        seller: user,
        attributes: {},
      }).unwrap();
      navigate(`/listings/${created.id}`);
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }

  return (
    <>
      <h1>Publicar anuncio</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        {formError?.title && <p className="field-error">{formError.title}</p>}

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          rows={3}
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {formError?.description && (
          <p className="field-error">{formError.description}</p>
        )}

        <label htmlFor="price">Precio (€)</label>
        <input
          id="price"
          type="number"
          min="0"
          value={String(data.price ?? "")}
          onChange={(e) => handleChange("price", Number(e.target.value))}
        />
        {formError?.price && <p className="field-error">{formError.price}</p>}

        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          value={data.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">Elige una</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {formError?.category && <p className="field-error">{formError.category}</p>}

        <label htmlFor="city">Ciudad</label>
        <select
          id="city"
          value={data.city}
          onChange={(e) => handleChange("city", e.target.value)}
        >
          <option value="">Elige una</option>
          <option value="Valencia">Valencia</option>
          <option value="Alicante">Alicante</option>
          <option value="Castellón">Castellón</option>
        </select>
        {formError?.city && <p className="field-error">{formError.city}</p>}

        <p>
          Se publicará a nombre de <strong>{user.name}</strong>.
        </p>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Publicando…" : "Publicar"}
        </button>
      </form>
    </>
  );
}
