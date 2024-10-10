import { withErrorBoundary, withSuspense } from '@extension/shared';

const Options = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="mb-4 flex items-center justify-between bg-white p-8 px-16 shadow">
        <h1 className="text-xl font-bold">TITLE</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-72 p-4 pl-16 text-lg">LEFT</nav>

        <main className="mr-16 flex-1 overflow-auto bg-white p-6 shadow">CENTER</main>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
