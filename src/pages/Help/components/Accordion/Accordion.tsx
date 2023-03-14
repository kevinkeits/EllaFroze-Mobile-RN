import React, { useState } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';

const Accordion = ({ items }:any) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index:any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView>
      {items.map((item:any, index:any) => (
        <View key={index}>
          <TouchableWithoutFeedback onPress={() => toggleAccordion(index)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
              <Text>{item.title}</Text>
              <Text>{activeIndex === index ? '-' : '+'}</Text>
            </View>
          </TouchableWithoutFeedback>
          {activeIndex === index && (
            <View style={{ padding: 10 }}>
              <Text>{item.content}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default Accordion;
