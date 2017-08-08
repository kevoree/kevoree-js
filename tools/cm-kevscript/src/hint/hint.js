const CodeMirror = require('codemirror');
const api = require('kevoree-registry-client');

const HINT_TPL = '<div class="hint-primary"><div class="hint-anchor {{type}}">{{typeText}}</div><div class="hint-text">{{text}}</div></div><div class="hint-secondary">{{desc}}</div>';

function renderTpl(tpl, data) {
  Object.keys(data).forEach((key) => {
    tpl = tpl.replace(new RegExp('{{' + key + '}}', 'g'), data[key]);
  });
  return tpl;
}

function renderHtml(data) {
  return (elem) => {
    elem.innerHTML = renderTpl(HINT_TPL, data);
  };
}

function getTypeDefinitionType(tdef) {
  if (tdef.metaClassName() === 'org.kevoree.NodeType') {
    return 'node';
  } else if (tdef.metaClassName() === 'org.kevoree.GroupType') {
    return 'group';
  } else if (tdef.metaClassName() === 'org.kevoree.ChannelType') {
    return 'channel';
  } else if (tdef.metaClassName() === 'org.kevoree.ComponentType') {
    return 'component';
  }
}

CodeMirror.registerHelper('hint', 'kevscript', hint);

function hint(cm, callback, options) {
  const cursor = cm.getCursor();
  const token = cm.getTokenAt(cursor);
  let cur = token.string;
  let start = token.start;
  let end = token.end;
  let list = [];
  let tmp;

  function model() {
    return options.getModel();
  }

  function rootInstances() {
    return model()
      .nodes.array
      .concat(model()
        .groups.array)
      .concat(model()
        .hubs.array);
  }

  function findRootInstance(name) {
    return rootInstances()
      .find((i) => {
        return i.name === name;
      });
  }

  function getType(model) {
    if (model.class.startsWith('org.kevoree.ComponentType')) {
      return 'component';
    } else if (model.class.startsWith('org.kevoree.ChannelType')) {
      return 'channel';
    } else if (model.class.startsWith('org.kevoree.GroupType')) {
      return 'group';
    } else if (model.class.startsWith('org.kevoree.NodeType')) {
      return 'node';
    }
    return 'tdef';
  }

  function spaceHelper() {
    cm.doc.replaceSelection(' ');
  }

  if (token.type === 'typedef' || token.state.state === 'typedef') {
    if (token.type === 'namespace') {
      tmp = cur;
      cur = tmp.trim();
      start += tmp.length - cur.length;

      // show namespace list
      return api.namespace.all()
        .then((namespaces) => {
          callback({
            list: namespaces
              .filter((ns) => {
                return cur.trim()
                  .length === 0 || ns.name.startsWith(cur);
              })
              .sort((ns0, ns1) => {
                return ns0.name.localeCompare(ns1.name);
              })
              .map((ns) => {
                return {
                  type: 'namespace',
                  typeText: 'n',
                  text: ns.name,
                  bufferText: ns.name + '.'
                };
              })
              .map((data) => {
                return {
                  text: data.bufferText,
                  className: 'cm-kevs-hint-elem',
                  render: renderHtml(data)
                };
              }),
            from: CodeMirror.Pos(cursor.line, start),
            to: CodeMirror.Pos(cursor.line, end)
          });
        });
    } else {
      start = (cur === '.') ? token.end : token.start;
      const ns = (cur === '.') ? token.state.namespace : 'kevoree';
      return api.tdef.getLatestsByNamespace(ns)
        .then((tdefs) => {
          callback({
            list: tdefs
              .filter((tdef) => {
                if (cur === '.' || cur.trim().length === 0) {
                  return true;
                } else {
                  return tdef.name.startsWith(cur);
                }
              })
              .sort((tdef0, tdef1) => {
                return tdef0.name.localeCompare(tdef1.name);
              })
              .map((tdef) => {
                const model = JSON.parse(tdef.model);
                const type = getType(model);
                return {
                  type: type,
                  typeText: type.substr(0, 1),
                  text: tdef.name,
                  bufferText: tdef.name,
                  desc: 'latest version: ' + tdef.version,
                  from: CodeMirror.Pos(cursor.line, start)
                };
              })
              .map((data) => {
                return {
                  text: data.bufferText,
                  className: 'cm-kevs-hint-elem',
                  render: renderHtml(data),
                  from: data.from,
                  to: data.to
                };
              }),
            from: CodeMirror.Pos(cursor.line, token.end),
            to: CodeMirror.Pos(cursor.line, token.end)
          });
        });
    }
  }

  switch (token.state.state) {
    case 'start':
      if (token.type === 'identifier') {
        if (token.state.stmt === 'attach' || token.state.stmt === 'detach') {
          // show groups
          list = model().groups.array
            .map((group) => {
              return {
                type: 'group',
                text: group.name,
                desc: group.typeDefinition.name + '/' + group.typeDefinition.version
              };
            })
            .filter((item) => {
              return cur.length === 0 || item.text.startsWith(cur);
            });
        } else if (token.state.stmt === 'bind' || token.state.stmt === 'unbind') {
          // show channels
          list = model().hubs.array
            .map((chan) => {
              return {
                type: 'channel',
                text: chan.name,
                desc: chan.typeDefinition.name + '/' + chan.typeDefinition.version
              };
            })
            .filter((item) => {
              return cur.length === 0 || item.text.startsWith(cur);
            });
        }
      } else {
        tmp = cur;
        cur = tmp.trim();
        start += tmp.length - cur.length;
        list = [
            { text: 'add', desc: 'create an instance' },
            { text: 'remove', desc: 'remove an instance' },
            { text: 'set', desc: 'change a param value' },
            { text: 'bind', desc: 'connect a port to a chan' },
            { text: 'unbind', desc: 'disconnect a port from a chan' },
            { text: 'attach', desc: 'connect a node to a group' },
            { text: 'detach', desc: 'disconnect a node from a group' },
            { text: 'network', desc: 'define a node network value' },
            { text: 'start', desc: 'start an instance' },
            { text: 'stop', desc: 'stop an instance' },
            { text: 'move', desc: 'move an instance to another node' },
        ]
          .map((stmt) => {
            stmt.type = 'stmt';
            stmt.bufferText = stmt.text + ' ';
            return stmt;
          })
          .filter((item) => {
            return cur.length === 0 || item.text.startsWith(cur);
          })
          .sort((item0, item1) => {
            return item0.text.localeCompare(item1.text);
          });
      }
      break;

    case 'addStmt':
    case 'bindStmt':
    case 'unbindStmt':
      if (cur === 'add' || cur === 'set' || cur === 'bind' || cur === 'unbind') {
        spaceHelper();
      } else {
        tmp = cur;
        cur = tmp.trim();
        start += tmp.length - cur.length;
        // hint with node instances
        list = model()
          .nodes.array.map((node) => {
            return {
              type: 'node',
              text: node.name,
              desc: node.typeDefinition.name + '/' + node.typeDefinition.version,
              bufferText: node.name + '.'
            };
          });

        if (cur.length > 0) {
          // there is already some text in the buffer => filter using it
          list = list.filter((item) => {
            return item.text.startsWith(cur);
          });
        }
      }
      break;

    case 'setStmt':
      if (cur === 'set') {
        spaceHelper();
      } else {
        if (token.state.instancePath.length === 3) {
          // show nodes for fragment
          list = model().nodes.array
            .map((node) => {
              return {
                type: 'node',
                text: node.name,
                bufferText: node.name + ' = \'\'',
                desc: node.typeDefinition.name + '/' + node.typeDefinition.version
              };
            })
            .filter((item) => {
              return item.text.startsWith(cur);
            });
        } else if (token.state.instancePath.length === 2) {
          tmp = findRootInstance(token.state.instancePath[0]);
          if (tmp) {
            // show attributes
            list = tmp.typeDefinition.dictionaryType.attributes.array
              .map((attr) => {
                return {
                  type: 'attr',
                  text: attr.name + (attr.fragmentDependant ? '/<node>' : ''),
                  bufferText: attr.fragmentDependant ? attr.name + '/' : attr.name,
                  desc: (attr.optional ? 'optional ' : '') + '"' + attr.datatype.toString().toLowerCase() + '"'
                };
              });
            // show also components if it's a node
            if (tmp.metaClassName() === 'org.kevoree.ContainerNode') {
              list = list
                .concat(tmp.components.array
                  .map((comp) => {
                    return {
                      type: 'component',
                      text: comp.name,
                      bufferText: comp.name + '.',
                      desc: comp.typeDefinition.name + '/' + comp.typeDefinition.version
                    };
                  })
                );
            }

            list = list.filter((item) => {
              return item.text.startsWith(cur);
            });
          }
        } else {
          tmp = cur;
          cur = tmp.trim();
          start += tmp.length - cur.length;
          list = rootInstances()
            .map((instance) => {
              return {
                type: getTypeDefinitionType(instance.typeDefinition),
                text: instance.name,
                desc: instance.typeDefinition.name + '/' + instance.typeDefinition.version,
                bufferText: instance.name + '.'
              };
            });

          if (cur.length > 0) {
            list = list.filter((elem) => {
              return elem.text.startsWith(cur);
            });
          }
        }
      }
      break;

    case 'attachStmt':
    case 'detachStmt':
      if (cur === 'attach' || cur === 'detach') {
        spaceHelper();
      } else {
        tmp = cur;
        cur = tmp.trim();
        start += tmp.length - cur.length;
        list = model()
          .nodes.array.map((node) => {
            return {
              type: 'node',
              text: node.name,
              desc: node.typeDefinition.name + '/' + node.typeDefinition.version
            };
          });

        if (cur.length > 0) {
          list = list.filter((elem) => {
            return elem.text.startsWith(cur);
          });
        }
      }
      break;

    case 'network':
      if (cur === 'network') {
        spaceHelper();
      } else {
        tmp = cur;
        cur = tmp.trim();
        start += tmp.length - cur.length;
        list = model()
          .nodes.array.map((node) => {
            return {
              type: 'node',
              text: node.name,
              desc: node.typeDefinition.name + '/' + node.typeDefinition.version,
              bufferText: node.name + '.'
            };
          });

        if (cur.length > 0) {
          list = list.filter((elem) => {
            return elem.text.startsWith(cur);
          });
        }
      }
      break;

    case 'networkStmt':
      cur = '';
      start += 1;
      list = model().nodes.array.map((node) => {
        return {
          type: 'node',
          text: node.name,
          bufferText: node.name + '.',
          desc: node.typeDefinition.name + '/' + node.typeDefinition.version
        };
      });
      break;

    case 'tdefversion':
      if (cur === '/') {
        cur = '';
        start = token.end;
        end += 1;
      }
      list = [{
        type: 'version',
        text: 'LATEST',
        desc: 'the latest available version',
      }].concat(model()
        .select('packages[' + (token.state.namespace || 'kevoree') + ']/typeDefinitions[name=' + token.state.typedef + ']')
        .array
        .map((tdef) => {
          return {
            type: 'version',
            text: tdef.version,
            desc: tdef.eContainer()
              .name + '.' + tdef.name
          };
        }));

      if (cur.length > 0) {
        list = list.filter((item) => {
          return item.text.startsWith(cur);
        });
      }
      break;

    case 'duversion':
      if (cur === '/') {
        cur = '';
        start = token.end;
        end += 1;
      }
      return api.du.getLatests(
          token.state.namespace || 'kevoree',
          token.state.typedef,
          token.state.version
        )
        .then((dus) => {
          if (dus.length > 0) {
            return [{
              type: 'version',
              bufferText: '{' + dus.map((du, i, array) => {
                let str = ' ' + du.platform + ': \'' + du.version + '\'';
                if (i < array - 1) {
                  str += ' ';
                }
                return str;
              }).join(', ') + '}',
              text: dus.map((du, i, array) => {
                let str = du.platform + '=' + du.version;
                if (i < array - 1) {
                  str += ' ';
                }
                return str;
              }).join(', '),
              desc: 'current latest deploy units'
            }];
          } else {
            return [];
          }
        })
        .catch(() => {
          return [];
        })
        .then((list) => {
          return api.du.getReleases(
            token.state.namespace || 'kevoree',
            token.state.typedef,
            token.state.version
          ).then((dus) => {
            if (dus.length > 0) {
              return list.concat([{
                type: 'version',
                bufferText: '{' + dus.map((du, i, array) => {
                  let str = ' ' + du.platform + ': \'' + du.version + '\'';
                  if (i < array - 1) {
                    str += ' ';
                  }
                  return str;
                }).join(', ') + '}',
                text: dus.map((du, i, array) => {
                  let str = du.platform + '=' + du.version;
                  if (i < array - 1) {
                    str += ' ';
                  }
                  return str;
                }).join(', '),
                desc: 'current latest deploy units (stable)'
              }]);
            } else {
              return list;
            }
          }).catch(() => {
            return list;
          });
        })
        .then((list) => {
          return list.concat([
            {
              type: 'version',
              text: 'LATEST',
              desc: 'always get latest deploy units',
            },
            {
              type: 'version',
              text: 'RELEASE',
              desc: 'always get latest deploy units (stable)',
            }
          ]);
        })
        .then((list) => {
          callback({
            list: list.filter((item) => {
              return item.text.startsWith(cur);
            }).map((item) => {
              item.typeText = item.type.substr(0, 1);
              return {
                text: item.bufferText,
                className: 'cm-kevs-hint-elem',
                render: renderHtml(item)
              };
            }),
            from: CodeMirror.Pos(cursor.line, start),
            to: CodeMirror.Pos(cursor.line, end)
          });
        });

    case 'instancepath':
    case 'instancepathInstancepath':
    case 'namelistInstancepath':
      if (token.state.stmt === 'set') {
        // we need to show components + attributes
        const rootInstance = findRootInstance(token.state.instancePath[0]);
        if (rootInstance) {
          if (token.state.instancePath.length === 1) {
            list = rootInstance.typeDefinition.dictionaryType.attributes.array
              .map((attr) => {
                return {
                  type: 'attr',
                  text: attr.name + (attr.fragmentDependant ? '/<node>' : ''),
                  bufferText: attr.name + (attr.fragmentDependant ? '/' : ' = \'\''),
                  desc: (attr.optional ? 'optional ' : '') + '"' + attr.datatype.toString()
                    .toLowerCase() + '"',
                  from: CodeMirror.Pos(cursor.line, token.end)
                };
              });
            if (rootInstance.components) {
              // rootInstance is a node: add components
              list = list.concat(rootInstance.components.array
                .map((comp) => {
                  return {
                    type: 'component',
                    text: comp.name,
                    bufferText: comp.name + '.',
                    desc: comp.typeDefinition.name + '/' + comp.typeDefinition.version,
                    from: CodeMirror.Pos(cursor.line, token.end)
                  };
                }));
            }
          } else if (token.state.instancePath.length === 2) {
            if (token.type === 'delimiter' && token.string === '/') {
              cur = '';
              start += 1;
              // fragment attribute part: show node list
              if (rootInstance.subNodes) {
                // this is a group: we are fine
                list = rootInstance.subNodes.array.map((node) => {
                  return {
                    type: 'node',
                    text: node.name,
                    bufferText: node.name + ' = \'\'',
                    desc: node.typeDefinition.name + '/' + node.typeDefinition.version
                  };
                });
              }
            }
            if (rootInstance.components) {
              // looking for attrs in comp
              tmp = rootInstance.findComponentsByID(token.state.instancePath[1]);
              if (tmp) {
                list = tmp.typeDefinition.dictionaryType.attributes.array
                  .map((attr) => {
                    return {
                      type: 'attr',
                      text: attr.name,
                      bufferText: attr.name + ' = \'\'',
                      desc: (attr.optional ? 'optional ' : '') + '"' + attr.datatype.toString()
                        .toLowerCase() + '"',
                      from: CodeMirror.Pos(cursor.line, token.end)
                    };
                  });
              }
            }
          }
        }
      } else if (token.state.stmt === 'bind' || token.state.stmt === 'unbind') {
        if (token.state.instancePath.length === 0) {
          // show channels
          list = model()
            .hubs.array.map((chan) => {
              return {
                type: 'channel',
                text: chan.name,
                desc: chan.typeDefinition.name + '/' + chan.typeDefinition.version,
                from: CodeMirror.Pos(cursor.line, token.end)
              };
            });
        } else if (token.state.instancePath.length === 1) {
          if (token.type === 'delimiter' && token.string === '.') {
            // now show components
            tmp = model()
              .findNodesByID(token.state.instancePath[0]);
            if (tmp) {
              list = tmp.components.array.map((comp) => {
                return {
                  type: 'component',
                  text: comp.name,
                  desc: comp.typeDefinition.name + '/' + comp.typeDefinition.version,
                  bufferText: comp.name + '.',
                  from: CodeMirror.Pos(cursor.line, token.end)
                };
              });
            }
          } else {
            list = model()
              .nodes.array.map((node) => {
                return {
                  type: 'node',
                  text: node.name,
                  desc: node.typeDefinition.name + '/' + node.typeDefinition.version,
                  bufferText: node.name + '.'
                };
              });

            if (cur.length > 0) {
              list = list.filter((item) => {
                return item.text.startsWith(cur);
              });
            }
          }
        } else if (token.state.instancePath.length === 2) {
          if (token.type === 'delimiter' && token.string === '.') {
            // now show components
            tmp = model()
              .findNodesByID(token.state.instancePath[0]);
            if (tmp) {
              const comp = tmp.findComponentsByID(token.state.instancePath[1]);
              if (comp) {
                list = comp.typeDefinition.provided.array
                  .map((port) => {
                    return {
                      type: 'input',
                      text: port.name,
                      from: CodeMirror.Pos(cursor.line, token.end)
                    };
                  })
                  .concat(comp.typeDefinition.required.array
                    .map((port) => {
                      return {
                        type: 'output',
                        text: port.name,
                        from: CodeMirror.Pos(cursor.line, token.end)
                      };
                    }));
              }
            }
          }
        }
      } else if (token.state.stmt === 'attach' || token.state.stmt === 'detach') {
        if (token.state.instancePath.length === 0 && token.type !== 'wildcard') {
          // show groups
          list = model()
            .groups.array
            .map((grp) => {
              return {
                type: 'group',
                text: grp.name,
                desc: grp.typeDefinition.name + '/' + grp.typeDefinition.version,
                from: CodeMirror.Pos(cursor.line, token.end)
              };
            });
        } else if (token.state.instancePath.length === 1) {
          if (token.type === 'delimiter' && token.string === '.') {
            // now show components
            tmp = model()
              .findNodesByID(token.state.instancePath[0]);
            if (tmp) {
              list = tmp.components.array.map((comp) => {
                return {
                  type: 'component',
                  text: comp.name,
                  desc: comp.typeDefinition.name + '/' + comp.typeDefinition.version,
                  bufferText: comp.name + '.',
                  from: CodeMirror.Pos(cursor.line, token.end)
                };
              });
            }
          } else {
            if (cur === ' ') {
              cur = '';
              start += 1;
            }
            list = model()
              .nodes.array.map((node) => {
                return {
                  type: 'node',
                  text: node.name,
                  desc: node.typeDefinition.name + '/' + node.typeDefinition.version
                };
              });

            if (cur.length > 0) {
              list = list.filter((item) => {
                return item.text.startsWith(cur);
              });
            }
          }
        }
      }
      break;

    default:
      list = [];
      break;
  }

  return callback({
    list: list
      .map((data) => {
        data.bufferText = data.bufferText || data.text;
        data.typeText = () => {
          return data.type.substr(0, 1);
        };
        return data;
      })
      .map((data) => {
        return {
          text: data.bufferText,
          className: 'cm-kevs-hint-elem',
          render: renderHtml(data),
          from: data.from,
          to: data.to
        };
      }),
    from: CodeMirror.Pos(cursor.line, start),
    to: CodeMirror.Pos(cursor.line, end)
  });
}
