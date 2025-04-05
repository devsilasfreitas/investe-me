import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { useUser } from "../contexts/UserContext";
import { Icon } from "react-native-elements";
import { act, useEffect, useState } from "react";
import { Action, getActions } from "../loaders/get-actions";
import { Props } from "../Route";
import { ActionCard } from "../components/Action";
import { Loading } from "./Loading";

export function Home({ navigation }: Props) {
  const { user, clearUser } = useUser();
  const [actions, setActions] = useState<Action[] | undefined>(undefined);

  useEffect(() => {
    getActions()
      .then((data) => {
        setActions(
          data.filter((action) => user?.actions.includes(action.stock))
        );
      })
      .catch((error) => {
        console.error("Error fetching actions:", error);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  if (!user) {
    return null;
  }

  const highestChange = actions
    ?.filter((action) => action.change > 0)
    .sort((a, b) => a.change - b.change)[0]?.stock;
  const lowestChange = actions
    ?.filter((action) => action.change < 0)
    .sort((a, b) => a.change - b.change)[0]?.stock;

  return (
    <ScreenContainer>
      <View style={styles.nameContainer}>
        <TouchableOpacity onLongPress={clearUser}>
          <Text style={styles.title}>Olá, {user.name.split(' ')[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon name="settings" color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.actionsHeader}>
        <Text style={styles.actionsTitle}>Minhas Ações</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewActions")}
          style={styles.actionsButton}
        >
          <Text style={styles.actionsButtonText}>Adicionar Ações</Text>
        </TouchableOpacity>
      </View>
      {actions ? (
        actions.length === 0 ? (
          <Text style={{ color: "white" }}>Você ainda não possui ações.</Text>
        ) : (
          <View>
            <FlatList
              data={[
                actions.find((action) => action.stock === highestChange)!,
                actions.find((action) => action.stock === lowestChange)!,
                ...actions.filter(
                  (action) =>
                    action.stock !== highestChange &&
                    action.stock !== lowestChange
                ),
              ]}
              renderItem={({ item }) => (
                <ActionCard
                  action={item}
                  selected={[highestChange, lowestChange].includes(item.stock)}
                  highestChange={highestChange === item.stock}
                  lowestChange={lowestChange === item.stock}
                />
              )}
              style={styles.actionsContainer}
            />
          </View>
        )) : (
          <Text style={{ color: "white" }}>Carregando ações...</Text>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  actionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  actionsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  actionsButton: {
    backgroundColor: "#00308F",
    padding: 10,
    borderRadius: 8,
  },
  actionsButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "column",
    gap: 20,
  },
});
