export default {
  fieldset: (enable: boolean) => {
    return {
      display: enable? 'block':'none',
      marginTop: 8
    };
  },
  legend: {
    fontWeight: 'bold',
    padding: '0 5px'
  },
  list: {
    listStyleType: 'none'
  },
  listItem: {
    paddingBottom: 5
  },
  label: {
    width: 150,
    display: 'inline-block',
    fontWeight: 'bold'
  },
  input: {
    display: 'inline-block'
  }
};
