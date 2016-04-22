const bgColor = '#333';
const textColor = '#9d9d9d';
const borderColor = '#999';
const activeTextColor = '#fff';
const activeBgColor = '#222';
const smallDevice = '430px';
const height = 50;

export default {
  bar: {
    height: height,
    lineHeight: `${height}px`,
    backgroundColor: bgColor,
    borderBottom: `1px solid ${borderColor}`,

    [`@media (max-width: ${smallDevice})`]: {
      height: 'auto'
    }
  },
  menu: {
    float: 'left',

    [`@media (max-width: ${smallDevice})`]: {
      float: 'none',
      display: 'none'
    }
  },
  menuChild: {
    float: 'left',
    width: 120,
    height: height,
    textAlign: 'center',
    borderRight: `1px solid ${borderColor}`,
    borderLeft: 'none',

    [`@media (max-width: ${smallDevice})`]: {
      float: 'none',
      width: '100%',
      textAlign: 'left',
      border: 'none'
    }
  },
  rightMenu: {
    float: 'right',

    [`@media (max-width: ${smallDevice})`]: {
      float: 'none'
    }
  },
  rightMenuChild: {
    borderLeft: `1px solid ${borderColor}`,
    borderRight: 'none'
  },
  menuResponsive: {
    display: 'none',

    [`@media (max-width: ${smallDevice})`]: {
      position: 'absolute',
      top: 0,
      right: 15,
      display: 'inline-block'
    }
  },
  menuResponsiveBtn: {
    color: textColor,
    height: 30,
    lineHeight: '30px',
    padding: '0 12px'
  },
  logo: {
    float: 'left',
    width: 60,
    textAlign: 'center',
    borderRight: `1px solid ${borderColor}`,

    [`@media (max-width: ${smallDevice})`]: {
      float: 'none',
      borderRight: 'none'
    }
  },
  logoImg: {
    verticalAlign: 'middle'
  },
  link: {
    display: 'block',
    color: textColor,
    textDecoration: 'none',

    ':hover': {
      color: activeTextColor
    },
    ':focus': {
      color: activeTextColor
    },
    [`@media (max-width: ${smallDevice})`]: {
      paddingLeft: 5
    }
  },
  activeLink: {
    color: activeTextColor,
    backgroundColor: activeBgColor
  },
  open: {
    [`@media (max-width: ${smallDevice})`]: {
      display: 'block'
    }
  }
};
