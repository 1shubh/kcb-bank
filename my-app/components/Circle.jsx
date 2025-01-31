import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ percentage, radius, strokeWidth }) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.circleContainer}>
      <Svg height={radius * 2} width={radius * 2}>
        {/* Background Circle */}
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <Circle
          stroke="#63bc46"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${radius}, ${radius}`}
        />
      </Svg>
      <Text style={styles.percentageText}>{`${percentage}%`}</Text>
    </View>
  );
};

const ProgressCircles = () => {
  return (
    <View style={styles.container}>
      {/* First Circle with 75% */}
      <CircularProgress percentage={75} radius={60} strokeWidth={10} />
      
      {/* Second Circle with 50% */}
      <CircularProgress percentage={50} radius={60} strokeWidth={10} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#63bc46',
  },
});
export default CircularProgress