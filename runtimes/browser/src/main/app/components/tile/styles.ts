const bgColor = '#333';
const textColor = '#eee';
const headerHeight = 25;
const headerRadius = 4;

export default {
  tile: {},
  header: {
    height: headerHeight,
    backgroundColor: bgColor,
    color: textColor,
    cursor: 'move',
    borderTopLeftRadius: headerRadius,
    borderTopRightRadius: headerRadius
  },
  description: {
    position: 'absolute',
    left: 0,
    right: 25,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  menu: {
    position: 'absolute',
    right: 0,
    width: 25,
    cursor: 'pointer',
    textAlign: 'center',
    borderTop: `1px solid ${bgColor}`,
    borderRight: `1px solid ${bgColor}`,
    borderTopRightRadius: headerRadius
  },
  open: {
    zIndex: 100,
    backgroundColor: textColor,
    color: bgColor
  },
  hide: {
    display: 'none'
  },
  name: {
    fontWeight: 800,
    paddingLeft: 5
  },
  items: {
    position: 'absolute',
    top: headerHeight - 1,
    right: 0,
    height: 'auto',
    minWidth: 80,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    backgroundColor: bgColor,
    color: textColor,
    padding: '2px 2px 0 2px',
    listStyleType: 'none'
  },
  item: {
    marginBottom: 2,

    ':hover': {
      backgroundColor: textColor,
      color: bgColor
    },
    ':focus': {
      backgroundColor: textColor,
      color: bgColor
    },
    ':active': {
      backgroundColor: textColor,
      color: bgColor
    }
  },
  content: {
    position: 'absolute',
    top: headerHeight,
    right: 0,
    bottom: 0,
    left: 0,
    borderLeft: `2px solid ${bgColor}`,
    borderRight: `2px solid ${bgColor}`,
    borderBottom: `2px solid ${bgColor}`
  }
}
