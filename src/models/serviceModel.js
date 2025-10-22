import { supabase } from "../config/supabaseClient.js";

export const ServiceModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("services")
      .select(`id, code, name, description, price, estimated_minutes, status, categories ( id, name )`);
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("services")
      .select(`id, code, name, description, price, estimated_minutes, status, categories ( id, name )`)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("services")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("services")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },
};
