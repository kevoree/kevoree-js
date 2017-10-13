export function getType(tdefClass) {
  if (tdefClass.startsWith('org.kevoree.ComponentType')) {
    return 'component';
  } else if (tdefClass.startsWith('org.kevoree.ChannelType')) {
    return 'channel';
  } else if (tdefClass.startsWith('org.kevoree.GroupType')) {
    return 'group';
  } else {
    return 'node';
  }
}
