import { useEffect, useState } from "react";
import { ScreenContainer } from "../components/ScreenContainer";
import { Action, getActions } from "../loaders/get-actions";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Route";
import { SvgUri } from "react-native-svg";
import { ActionDetails, getActionDetails } from "../loaders/get-action-details";
import { useUser } from "../contexts/UserContext";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export function Details ({ route, navigation }: Props) {
  const [action, setAction] = useState<ActionDetails | null | undefined>(undefined);
  const { actionStock } = route.params;
  const { user, saveActions } = useUser();

  if (!user) {
    return null;
  }

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
          <View style={styles.container}>
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
                {action.longName && (
                  <Text
                    style={styles.longName}
                  >
                    {action.longName}
                  </Text>
                )}
                <Text
                  style={styles.stock}
                >
                  {action.symbol}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 10 }}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Propriedade</Text>
                <Text style={styles.tableHeaderText}>Valor</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Último preço</Text>
                <Text style={styles.tableCell}>{action.regularMarketPrice ? `R$ ${action.regularMarketPrice.toFixed(2)}` : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Variação</Text>
                <Text style={styles.tableCell}>{action.regularMarketChange ? `R$ ${action.regularMarketChange.toFixed(2)}` : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Variação percentual</Text>
                <Text style={styles.tableCell}>{action.regularMarketChangePercent ? `${action.regularMarketChangePercent.toFixed(2)}%` : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Data</Text>
                <Text style={styles.tableCell}>{action.regularMarketTime ? new Date(action.regularMarketTime).toLocaleString() : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Volume</Text>
                <Text style={styles.tableCell}>{action.regularMarketVolume ? action.regularMarketVolume.toLocaleString() : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Abertura</Text>
                <Text style={styles.tableCell}>{action.regularMarketOpen ? `R$ ${action.regularMarketOpen.toFixed(2)}` : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Máxima</Text>
                <Text style={styles.tableCell}>{action.regularMarketDayHigh ? `R$ ${action.regularMarketDayHigh.toFixed(2)}` : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Mínima</Text>
                <Text style={styles.tableCell}>{action.regularMarketDayLow ? `R$ ${action.regularMarketDayLow.toFixed(2)}` : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Fechamento</Text>
                <Text style={styles.tableCell}>{action.regularMarketPreviousClose ? `R$ ${action.regularMarketPreviousClose.toFixed(2)}` : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>P/L</Text>
                <Text style={styles.tableCell}>{action.priceEarnings ? action.priceEarnings.toFixed(2) : 'N/A'}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>EPS</Text>
                <Text style={styles.tableCell}>{action.earningsPerShare ? `R$ ${action.earningsPerShare.toFixed(2)}` : 'N/A'}</Text>
              </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const updatedActions = user.actions.filter((item) => item !== actionStock);
                saveActions(updatedActions);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.buttonText}>Apagar Ação</Text>
            </TouchableOpacity>
          </View>
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
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'flex-start',
  },
  nameContainer: {
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
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#444444',
    padding: 10,
    borderRadius: 10,
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },
  tableCell: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 10,
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});