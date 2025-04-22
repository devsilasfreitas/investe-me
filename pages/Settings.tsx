import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from "../contexts/UserContext";
import { ScreenContainer } from "../components/ScreenContainer";
import { Icon } from "react-native-elements";
import { useState } from "react";

export function Settings () {
  const { user, saveName } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  return (
    <ScreenContainer>
      <Text style={styles.title}>Configurações</Text>
      <View>
        <Text style={styles.label}>Nome:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor={"#ccc"}
            style={{
              ...styles.input,
              ...(editMode ? styles.inputActive : {}),
            }}
            value={name}
            readOnly={!editMode}
            onChangeText={(text) => {
              setName(text);
            }}

          />
          {!editMode && (
            <Icon
              name="edit"
              color="white"
              onPress={() => {
                setEditMode(!editMode);
              }}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (name.length < 2) {
            alert("Digite um nome válido");
            return;
          }
          saveName(name);
          setEditMode(false);
        }}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  input: {
    padding: 8,
    borderRadius: 8,
    color: "white",
    marginBottom: 16,
    width: "auto"
  },
  inputActive: {
    padding: 8,
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#6495ED",
    color: "white",
    marginBottom: 16,
    width: "100%"
  },
  button: {
    backgroundColor: "#00308F",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});