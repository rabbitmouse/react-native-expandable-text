import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  descText: {
    color: '#8e939f',
    lineHeight: 16,
    fontSize: 12
  },
  expandWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addPosition: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContent: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: '#1f2126',
    lineHeight: 16,
    fontSize: 12
  },
  gradientView: {
    flex: 1,
    minWidth: 30,
    height: 16
  },
  arrowIcon: {
    width: 12,
    height: 8
  }
});

export default styles;
