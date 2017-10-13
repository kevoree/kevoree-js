module.exports = {
  container: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexGrow: 1,
    flexFlow: 'column',
    minWidth: 200,
    minHeight: 200,
  },
  topPanel: {
    padding: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexShrink: 0
  },
  maxLines: {
    width: 100,
  },
  listPanel: {
    padding: '10px 5px',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto'
  },
  emptyList: {
    textAlign: 'center',
    padding: '8px 0'
  },
  list: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    height: '100%',
    listStyleType: 'none'
  },
  listItem: {
    borderBottom: '1px solid #ccc',
    padding: '0 10px',
    height: 25
  }
};
