import { StyleSheet } from 'react-native';

import { colors } from 'app/styles/Common';
import p from 'app/utils/Transfrom';

const styles = StyleSheet.create({
  descText: {
    color: colors.gray3,
    lineHeight: p(33),
    fontSize: p(24)
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
    backgroundColor: colors.pureWhite,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.black3,
    lineHeight: p(33),
    fontSize: p(24)
  },
  gradientView: {
    flex: 1,
    minWidth: p(60),
    height: p(33)
  },
  arrowIcon: {
    width: p(24),
    height: p(16)
  }
});

export default styles;
