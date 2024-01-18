import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession();

  const session = sessionData?.session;

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const {
    data: {
      session: {
        user: { id: userId },
      },
    },
  } = await supabase.auth.getSession();

  let updateData;

  if (password) {
    updateData = { password };
  } else if (fullName || avatar) {
    updateData = {
      data: {
        fullName,
      },
    };

    if (avatar) {
      const fileName = `avatar-${userId}-${Math.random()}`;

      const { error: FileUplaodError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

      if (FileUplaodError) throw new Error(FileUplaodError.message);

      updateData.data.avatar = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
    }
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  return data;
}
