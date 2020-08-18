import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MenuInput from "./MenuInput";

function MenuInputList({ menus = [], onRemoveMenu, onAddMenu }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View>
          {menus.map((menu) => (
            <View key={menu.name} style={styles.menu}>
              <MenuInput
                key={menu.name}
                menu={menu}
                onChangeMenu={() => onRemoveMenu(menu)}
              />
            </View>
          ))}
        </View>
        <MenuInput onChangeMenu={(menu) => onAddMenu(menu)} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  menu: {
    marginRight: 10,
  },
});

export default MenuInputList;
