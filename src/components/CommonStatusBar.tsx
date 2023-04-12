import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { ColContainer } from '../utils/StyledComponent';
import { colors } from '../utils/colors';
import { statusBarHeight } from '../utils/measurements';

const CommonStatusBar = () => {
    return (<>
        {/* StatusBar Start */}
        < ColContainer style={styles.statusBar} />
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        {/* Statusbar End */}
    </>
    )
}

export default CommonStatusBar;

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? statusBarHeight : 0,
        backgroundColor: colors.primary,
    },
});
