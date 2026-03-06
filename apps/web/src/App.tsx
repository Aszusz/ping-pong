import { usePongs, useCreatePong, useClearPongs } from "./hooks";
import { PongList } from "./components/PongList";

export default function App() {
  const { data: pongs, refetch } = usePongs();
  const createPong = useCreatePong();
  const clearPongs = useClearPongs();

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 data-testid="heading" className="mb-6 text-3xl font-bold">
        Ping Pong
      </h1>

      <div className="mb-6 flex gap-3">
        <button
          data-testid="ping-button"
          onClick={() => createPong.mutate()}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Ping
        </button>
        <button
          data-testid="refresh-button"
          onClick={() => refetch()}
          className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
        >
          Refresh
        </button>
        <button
          data-testid="clear-button"
          onClick={() => clearPongs.mutate()}
          className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
        >
          Clear
        </button>
      </div>

      <PongList pongs={pongs ?? []} />
    </div>
  );
}
