import React, { useRef } from "react";
import { View, ScrollView } from "react-native";
import MenuInput from "./MenuInput";
import CachedMenu from "./CachedMenu";

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
            <View key={menu.name}>
              <CachedMenu
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

export default MenuInputList;
