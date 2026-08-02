import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import Leads from '@/pages/Leads';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/leads" component={Leads} />
      {/* Catch-all route */}
      <Route>
        <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold font-display text-primary">404</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
            <a href="/" className="text-primary hover:underline inline-block mt-4">Return Home</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter
        base={import.meta.env.BASE_URL.replace(/\/$/, '')}
        ssrPath={ssrPath}
      >
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
