import { HeroStyle1 } from "./Style1/Hero1";
import { HeroStyle2 } from "./Style2/Hero2";
import { HeroStyle3 } from "./Style3/Hero3";

export interface HeroProps {
  headline: string;
  subHeadline: string;
  imageUrl: string;
  style?: number;
}

const Hero = ({ style = 1, ...rest }: HeroProps) => {
  return (
    <section className="relative px-6 lg:px-0">
      {style === 1 && <HeroStyle1 {...rest} />}
      {style === 2 && <HeroStyle2 {...rest} />}
      {style === 3 && <HeroStyle3 {...rest} />}
    </section>
  );
};

export default Hero;
