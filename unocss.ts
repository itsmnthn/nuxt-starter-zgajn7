import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { toEscapedSelector as e } from 'unocss';

const commonGradientBorderStyles = (
  [],
  { rawSelector }: { rawSelector: string }
) => {
  const selector = e(rawSelector);
  const psuedo = selector.startsWith('.a')
    ? '::after'
    : selector.startsWith('.b')
    ? '::before'
    : '';
  if (psuedo === '') return;

  return `${selector} {
  position: relative;
}

${selector} > * {
  position: relative;
  z-index: 2;
}

${selector}${psuedo} {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  content: '';
  height: 100%;
  position: absolute;
  border-radius: inherit;
  background-size: 100% 100%;
  transition: background-position 0.3s ease-in-out, opacity 0.3s ease-in-out;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
`;
};

const gradientResolver = ([, name, deg = '0']: string[]) => {
  deg = deg + 'deg';

  return {
    '--deg': deg,
    background: `linear-gradient(var(--deg), var(--${name}))`,
  };
};

export default {
  // presets
  uno: true, // enabled `@unocss/preset-uno`
  icons: true, // enabled `@unocss/preset-icons`
  attributify: false, // enabled `@unocss/preset-attributify`,
  transformers: [transformerVariantGroup(), transformerDirective()],

  rules: [
    [
      /^(?:agr-b|agr-border|bgr-b|bgr-border)$/,
      commonGradientBorderStyles,
      { autocomplete: ['agr-b', 'agr-border', 'bgr-b', 'bgr-border'] },
    ],

    /**
     * background gradient with degree
     * @example bggr-blueCapriPurpleElectBCrayola-12 bg-gr-blueCapriPurpleElectBCrayola-45 bg-gradient-blueCapriPurpleElectBCrayola-32 // defaults to 0
     */
    [
      /^(?:bggr|bg-gr|bg-gradient)-(.+)-(\d+)$/,
      gradientResolver,
      { autocomplete: ['(bggr|bg-gr|bg-gradient)'] },
    ],
  ],
};
