import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { DropdownIcon } from '../../../../assets/icons';


interface Help {
  ID: string;
  Title: string;
  Content: string;

}

interface Props {
  data:Help[]

}
const Accordion = ({data}:Props) => {

  const [activeSection, setActiveSection] = useState(-1);

  const toggleSection = (index:any) => {
    setActiveSection(activeSection === index ? -1 : index);
  };

  return (
    <View>
      {/* {data.map((item, index) => (
        <View key={index} style={{ borderBottomWidth:1, marginBottom:5, paddingLeft:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(index)} style={{paddingVertical:15}}>
            <Text>{item.Title}</Text>
          </TouchableOpacity>
          {activeSection === index && (
            <Text style={{ marginVertical:30}}>{item.Content}</Text>
          )}
        </View>
      ))} */}
      {data.map((item, index)=>(
        <View
        key={index}
        style={{ borderBottomWidth:1, borderBottomColor:"gray", marginBottom:5, paddingHorizontal:10, width:"100%"}}>
          <TouchableOpacity onPress={() => toggleSection(index)} style={{paddingVertical:15, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{width:"90%"}}>{item.Title}</Text>
            <Icon
                  name={activeSection == index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  type="material"
                  size={25}
                  color={activeSection == index ? 'red' : 'green'}
                />
          </TouchableOpacity>
          {activeSection === index && (
            <View style={{marginVertical:20}}>
              <Text style={{width:"90%"}}>
                {item.Content.replace(/<\/?p>/g, '\n')}
              </Text>

            </View>
          )}
        </View>
      ))}
       
      
    </View>
  );
};

export default Accordion;


