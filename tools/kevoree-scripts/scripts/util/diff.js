const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table');

/**
 * Pretty print the discrepencies between local & registry
 */
module.exports = function diff(srcModel, regModel, traces) {
  console.log(chalk.yellow('There are discrepencies between your local TypeDefinition and the one found on the registry:'));

  const addTraces = {},
    removeTraces = {},
    setTraces = {};
  traces.forEach((trace) => {
    let p, elem, regElem;
    if (trace.traceType.name() === 'SET') {
      p = path.basename(trace.srcPath);
      elem = srcModel.findByPath(trace.srcPath);
      regElem = regModel.findByPath(trace.srcPath);
      if (elem && regElem) {
        if (elem.getRefInParent() === 'attributes' ||
          elem.getRefInParent() === 'metaData') {
          if (!setTraces[p]) {
            setTraces[p] = { local: elem, registry: regElem };
          }
        }
      }
    } else if (trace.traceType.name() === 'ADD') {
      p = path.basename(trace.previousPath);
      elem = srcModel.findByPath(trace.previousPath);
      if (elem) {
        if (elem.getRefInParent() === 'attributes' ||
          elem.getRefInParent() === 'metaData' ||
          elem.getRefInParent() === 'required' ||
          elem.getRefInParent() === 'provided') {
          if (!addTraces[p]) {
            addTraces[p] = elem;
          }
        }
      }

    } else if (trace.traceType.name() === 'REMOVE') {
      p = path.basename(trace.objPath);
      elem = regModel.findByPath(trace.objPath);
      if (elem) {
        if (elem.getRefInParent() === 'attributes' ||
          elem.getRefInParent() === 'metaData' ||
          elem.getRefInParent() === 'required' ||
          elem.getRefInParent() === 'provided') {
          if (!addTraces[p]) {
            removeTraces[p] = elem;
          }
        }
      }
    }
  });

  Object.keys(setTraces).forEach((elemPath) => {
    const elem = setTraces[elemPath].local,
      regElem = setTraces[elemPath].registry;
    let table;
    switch (elem.getRefInParent()) {
      case 'attributes':
        table = new Table({
          head: [chalk.yellow('attribute[' + elem.name + ']'), chalk.cyan('Local'), chalk.cyan('Registry')]
        });
        table.push(['optional', elem.optional, regElem.optional]);
        table.push(['datatype', elem.datatype, regElem.datatype]);
        table.push(['defaultValue', elem.defaultValue, regElem.defaultValue]);
        console.log(table.toString());
        break;

      case 'metaData':
        table = new Table({
          head: [(chalk.yellow('metaData[' + elem.name + ']')), chalk.cyan('Local'), chalk.cyan('Registry')]
        });
        table.push(['value', elem.value, regElem.value]);
        console.log(table.toString());
        break;

      default:
      break;
    }
  });

  if (Object.keys(addTraces).length > 0) {
    const addTable = new Table({
      head: [chalk.yellow('Registry does not have:')]
    });
    Object.keys(addTraces).forEach((elemPath) => {
      const elem = addTraces[elemPath];
      switch (elem.getRefInParent()) {
        case 'attributes':
          addTable.push(['attribute[' + elem.name + ']']);
          break;

        case 'provided':
          addTable.push(['input[' + elem.name + ']']);
          break;

        case 'required':
          addTable.push(['output[' + elem.name + ']']);
          break;

        case 'metaData':
          addTable.push(['metaData[' + elem.name + ']']);
          break;

        default:
          break;
      }
    });
    console.log(addTable.toString());
  }

  if (Object.keys(removeTraces).length > 0) {
    const removeTable = new Table({
      head: [chalk.yellow('Missing locally:')]
    });
    Object.keys(removeTraces).forEach((elemPath) => {
      const elem = removeTraces[elemPath];
      switch (elem.getRefInParent()) {
        case 'attributes':
          removeTable.push(['attribute[' + elem.name + ']']);
          break;

        case 'provided':
          removeTable.push(['input[' + elem.name + ']']);
          break;

        case 'required':
          removeTable.push(['output[' + elem.name + ']']);
          break;

        case 'metaData':
          removeTable.push(['metaData[' + elem.name + ']']);
          break;

        default:
          break;
      }
    });
    console.log(removeTable.toString());
  }
};
