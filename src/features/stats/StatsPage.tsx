import { useGetStatsQuery } from "../../app/api";
import { Loading } from "../../components/ui/Loading";

export function StatsPage() {
  const { data: stats, isLoading, error } = useGetStatsQuery();

  if (isLoading) return <Loading />;
  if (error) return <div className="error">Error al cargar estadísticas</div>;

  return (
    <>
      <h1>Estadísticas por categoría</h1>
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Anuncios</th>
          </tr>
        </thead>
        <tbody>
          {(stats ?? []).map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
