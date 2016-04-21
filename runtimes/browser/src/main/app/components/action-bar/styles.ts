const dark = '#222';
const lessDark = '#333';
const gray = '#999';
const darkerGray = '#888';
const lighterGray = '#9d9d9d';

export default {
  bar: {
    backgroundColor: dark,
    height: 25,
    lineHeight: 'normal'
  },
  action: {
    display: 'inline-block'
  },
  button: {
    height: 25,
    lineHeight: '25px',
    padding: '0 6px',
    margin: 0,
    color: lighterGray,
    borderWidth: '0 1px 0 0',
    borderRadius: 0,
    borderColor: lighterGray,
    borderStyle: 'solid',

    ':hover': {
      backgroundColor: gray,
      color: lessDark
    },
    ':focus': {
      backgroundColor: gray,
      color: lessDark
    },
    ':active': {
      backgroundColor: darkerGray,
      color: dark
    }
  },
  helper: {
    display: 'inline-block',
    color: lighterGray,
    fontStyle: 'italic',
    float: 'right',
    paddingRight: 5,
    lineHeight: '24px',

    '@media (max-width: 430px)': {
      display: 'none'
    }
  },
  hide: {
    display: 'none'
  }
};
