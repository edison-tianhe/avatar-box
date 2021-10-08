import NationalDemo from './assets/national/national-demo.webp'
import HideOnScroll from './components/HideOnScroll';
import CardMedia from './components/CardMedia';
import National from './components/National';

function App() {
  return (
    <>
      <HideOnScroll />
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <CardMedia
          title="国庆头像"
          image={NationalDemo}
        >
          <National />
        </CardMedia >
      </div>
    </>
  );
}

export default App;
