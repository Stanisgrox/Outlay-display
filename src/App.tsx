import { Header } from './components/header';
import { TableCanvas } from './components/main-ui/table-canvas';
import { Sidenav } from './components/sidenav';

function App() {

  return (
    <div className="App">
      <main className='flex column justify-start' >
        <Header />
        
        <div className='flex grow'>
          <Sidenav />
          <div className='grow'>
            <TableCanvas />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
