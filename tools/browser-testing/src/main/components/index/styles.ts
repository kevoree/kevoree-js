export default {
  container: {
    fontFamily: 'Roboto'
  },
  header: {
    color: '#ccc',
    backgroundColor: '#333'
  },
  title: {
    textTransform: 'uppercase',
    margin: 0,
    padding: 8
  },
  content: {
    margin: 8,
    overflow: 'auto'
  },
  leftContent: {
    float: 'left',
    width: '49%'
  },
  paddingTop: {
    paddingTop: 5
  },
  rightContent: {
    float: 'right',
    width: '49%'
  },
  legend: {
    fontWeight: 'bold',
    padding: '0 5px'
  },
  tile: {
    width: 200,
    height: 200,
    border: '1px solid #000',
    margin: 'auto',
    padding: 4
  },
  error: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 'small',
    padding: 2
  },
  fieldset: (enable: boolean) => {
    return {
      display: enable? 'block':'none',
      marginTop: 8
    };
  }
};
