import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, TextInput, StyleSheet } from "react-native";
import { Action, getActions } from "../loaders/get-actions";
import { ScreenContainer } from "../components/ScreenContainer";
import { ActionCard } from "../components/Action";
import { useUser } from "../contexts/UserContext";
import { Props } from "../Route";

export function NewActions({ navigation }: Props) {
  const { user, saveActions } = useUser();
  const [actions, setActions] = useState<Action[]>([]);
  const [actionsSelected, setActionsSelected] = useState<string[]>(
    user?.actions || [],
  );
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getActions()
      .then((data) => {
        setActions(data);
      })
      .catch((error) => {
        console.error("Error fetching actions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Selecionar Ações</Text>
      <TextInput
        placeholder="Pesquisar ações"
        placeholderTextColor={"#ccc"}
        style={styles.searchInput}
        onChangeText={(text) => {
          setSearch(text);
        }}
        value={search}
      />
      
      <View style={{ flex: 1 }}>
        {loading ? (
          <Text style={{ color: 'black' }}>Loading...</Text>
        ) : (
          <FlatList
            data={search.length > 0 ? actions.filter(action => (
              action.name.toLowerCase().includes(search.toLowerCase()) ||
              action.stock.toLowerCase().includes(search.toLowerCase())
            )) : actions}
            keyExtractor={(item) => item.stock}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (actionsSelected.includes(item.stock)) {
                    setActionsSelected(actionsSelected.filter(stock => stock !== item.stock));
                  } else {
                    setActionsSelected([...actionsSelected, item.stock]);
                  }
                }}
              >
                <ActionCard action={item} selected={actionsSelected.includes(item.stock)} />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{  }}
            style={{ marginTop: 20 }}
          />
        )}
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          opacity: actionsSelected.length === 0 ? 0.5 : 1,
        }}
        onPress={() => {
          saveActions(actionsSelected);
          navigation.navigate("Home");
        }}
        disabled={actionsSelected.length === 0}
      >
        <Text style={styles.buttonText}>Selecionar {actionsSelected.length} Ações</Text>
      </TouchableOpacity>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white"
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    color: 'white'
  },
  button: {
    backgroundColor: '#00308F',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});