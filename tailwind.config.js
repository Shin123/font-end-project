/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans'],
      },
      fontSize: {
        'headline-1': '24px',
        'headline-2': '20px',
        'headline-3': '18px',
        'headline-4': '16px',
        'body-1': '16px',
        'body-2': '14px',
      },
      lineHeight: {
        'headline-1': '30px',
        'headline-2': '24px',
        'headline-3': '22px',
        'headline-4': '20px',
        'body-1': '20px',
        'body-2': '18px',
      },
      colors: {
        //Primary
        'primary-100': '#6713EF',
        'primary-90': '#762BF1',
        'primary-80': '#8542F2',
        'primary-70': '#955AF4',
        'primary-60': '#A471F5',
        'primary-50': '#B389F7',
        'primary-40': '#C2A1F9',
        'primary-30': '#D1B8FA',
        'primary-20': '#E1D0FC',
        'primary-10': '#F0E7FD',
        //Neutral
        'neutral-0': '#202020',
        'neutral-1': '#353C49',
        'neutral-2': '#505866',
        'neutral-3': '#B1B8C0',
        'neutral-4': '#D9E0E8',
        'neutral-5': '#E9EDF1',
        'neutral-6': '#F2F4F6',
        'neutral-7': '#F8F8F9',
        'neutral-8': '#FFFFFF',
        //Text
        'text-0': '#353C49',
        'text-1': '#676E8B',
        'text-2': '#9198A0',
        'text-3': '#B1B8C0',
        'text-4': '#D1D6DA',
        'text-5': '#FFFFFF',
      },
      boxShadow: {
        shadow: '0 0 12px rgba(0, 0, 0, 0.12',
        basic: '0 0 4px rgba(0, 0, 0, 0.12',
      },
      borderWidth: ['hover', 'focus'],
    },
  },
  plugins: [],
};
