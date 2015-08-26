var Statements: { [key: string]: Statement<any> } = {
    add:                    require('./add'),
    // addRepo:                require('./addRepo'),
    // anything:               require('./anything'),
    // attach:                 require('./attach'),
    // addBinding:             require('./addBinding'),
    // delBinding:             require('./delBinding'),
    // detach:                 require('./detach'),
    // doubleQuoteLine:        require('./doubleQuoteLine'),
    // escaped:                require('./escaped'),
    // include:                require('./include'),
    instancePath:           require('./instancePath'),
    // move:                   require('./move'),
    nameList:               require('./nameList'),
    // namespace:              require('./namespace'),
    // network:                require('./network'),
    // pause:                  require('./pause'),
    // realString:             require('./realString'),
    // realStringNoNewLine:    require('./realStringNoNewLine'),
    // remove:                 require('./remove'),
    // repoString:             require('./repoString'),
    set:                    require('./set'),
    // singleQuoteLine:        require('./singleQuoteLine'),
    // start:                  require('./start'),
    // stop:                   require('./stop'),
    string:                 require('./string'),
    string2:                require('./string2'),
    string3:                require('./string3'),
    typeDef:                require('./typeDef'),
    typeFQN:                require('./typeFQN'),
    version:                require('./version'),
    // newLine:                require('./newLine'),
    // wildcard:               require('./wildcard')
};

export = Statements;
