import { useEffect, useState } from "react";
import { ScreenContainer } from "../components/ScreenContainer";
import { Action, getActions } from "../loaders/get-actions";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Route";
import { SvgUri } from "react-native-svg";
import { ActionDetails, getActionDetails } from "../loaders/get-action-details";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export function Details ({ route }: Props) {
  const [action, setAction] = useState<ActionDetails | null | undefined>(undefined);
  const { actionStock } = route.params;

  useEffect(() => {
    getActionDetails(actionStock).then((action) => {
      setAction(action);
    });
  }, []);

  return (
    <ScreenContainer>
      {
        action === undefined ? (
          <View 
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white' }}>Carregando...</Text>
          </View>
        ) : action ? (
          <>
            <View
              style={styles.nameContainer}
            >
              <SvgUri
                uri={action.logourl}
                width={64}
                height={64}
                style={{ borderRadius: 20, width: 100 }}
              />
              <View>
                <Text
                  style={styles.shortName}
                >
                  {action.shortName}
                </Text>
                <Text
                  style={styles.longName}
                >
                  {action.longName}
                </Text>
                <Text
                  style={styles.stock}
                >
                  {action.symbol}
                </Text>
              </View>
            </View>
            <View> // Table
              <View></View> // First Column
              <View></View> // Second COlumn
            </View>
          </>
        ) : (
          <View 
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white' }}>Ação não encontrada!</Text>
          </View>
        )
      }
    </ScreenContainer>
  )
};

const styles = StyleSheet.create({
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  shortName: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  },
  longName: {
    fontSize: 12,
    color: 'white'
  },
  stock: {
    color: 'white'
  }
});