import { View, Image, Text, StyleSheet } from "react-native";
import { Action } from "../loaders/get-actions";
import { SvgUri } from "react-native-svg";
import { Icon } from "react-native-elements";

interface ActionCardProps {
  action: Action;
  selected?: boolean;
  highestChange?: boolean;
  lowestChange?: boolean;
};

export function ActionCard({ action, selected, highestChange, lowestChange }: ActionCardProps) {
  return (
    <View 
      style={{ 
        ...styles.card,
        ...(selected ? styles.cardSelected : {}),
      }}
      >
      <SvgUri
        uri={action.logo}
        width="50"
        height="50"
        style={styles.logo}
        onError={() => {}}
      />
      <View style={{ flex: 1 }}>
        <Text 
          style={styles.title}
        >
          {action.name} ({action.stock})
        </Text>
        {highestChange && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text 
              style={{ 
                ...styles.stat,
                color: "#0ead69"
              }}
            >Maior valorização
            </Text>
            <Icon
              name="arrow-up"
              type="material-community"
              color="#0ead69"
              size={20}
              style={{ marginLeft: 4 }}
            />
          </View>
        )}
        {lowestChange && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text 
              style={{ 
                ...styles.stat,
                color: "#fd0e04"
              }}
            >Maior desvalorização
            </Text>
            <Icon
              name="arrow-down"
              type="material-community"
              color="#fd0e04"
              size={20}
              style={{ marginLeft: 4 }}
            />
          </View>
        )}
        <View style={styles.description}>
          <Text 
            style={{
              ...styles.stock,
              color: selected ? "white" : "#6495ED",
            }}
          >{
            new Intl.NumberFormat(
              'pt-BR', 
              { 
                style: 'currency', 
                currency: 'BRL' 
              }
            ).format(action.close)
          }</Text>
          <Text 
          style={{
            ...styles.change,
            backgroundColor: action.change > 0 ? "#0ead69" : "#fd0e04",
            padding: 4,
            borderRadius: 6,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
          }}
          >
            {action.change.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },
  cardSelected: {
    backgroundColor: "#00308F",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  stat: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-end",
    gap: 4,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  sector: {
    fontSize: 14,
    color: "#999",
  },
  type: {
    fontSize: 14,
    color: "#999",
  },
  close: {
    fontSize: 20,
    fontWeight: "bold",
  },
  change: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  volume: {
    fontSize: 14,
    color: "#999",
  },
  market_cap: {
    fontSize: 14,
    color: "#999",
  },
  stock: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
  },
  name: {
    fontSize: 14,
    color: "#999",
  },
});