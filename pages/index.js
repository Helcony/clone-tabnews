import Image from 'next/image';
import monkeyImg from '/monkeyimg.jpeg'
import monkeyGif from '/monkey.gif'

function Home() {
  return <>
  <h1>Em construção =]</h1>
  <Image src={monkeyImg} alt="monkey img"/>
  <Image src={monkeyGif} alt="monkey gif"/>
  </>;
}

export default Home;
