import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

type NotificationIconProps = {
  name: string;
  type: string;
  size: number;
  notificationCount: number;
};

const NotificationIcon: React.FC<NotificationIconProps> = ({
  name,
  type,
  size,
  notificationCount,
}) => {
  return (
    <View style={styles.container}>
      <Icon name={name} type={type} size={size} color="#FFFF" />
      {notificationCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{notificationCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderWidth:1,
    borderColor:"white",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationIcon;
