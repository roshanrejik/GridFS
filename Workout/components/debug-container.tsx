import React from 'react';
import { View, ViewProps } from 'react-native';

interface DebugContainerProps extends ViewProps {
    enabled: boolean;
    color?: string;
    children: React.ReactNode;
}

/**
 * A utility component that adds a colored border to itself and optionally highlights 
 * the space of its children when debug mode is enabled.
 */
export const DebugContainer: React.FC<DebugContainerProps> = ({
    enabled,
    color = '#FF3B30',
    children,
    style,
    ...props
}) => {
    return (
        <View
            style={[
                style,
                enabled && {
                    borderWidth: 1,
                    borderColor: color,
                    backgroundColor: `${color}10` // 10% opacity
                }
            ]}
            {...props}
        >
            {children}
        </View>
    );
};
