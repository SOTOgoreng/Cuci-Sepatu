import { supabase } from "../config/supabaseClient.js";

export const OrderModel = {
  async create(payload) {
    const { data, error } = await supabase
      .from("washing_orders")
      .insert([payload])
      .select(`*, services (name, price)`)
      .single();
    if (error) throw error;
    return data;
  },

  async getAll(status) {
  let query = supabase
    .from("washing_orders")
    .select(`id,customer_name,phone,status,received_at,finished_at, notes,services ( name, price )`)
    .order("received_at", { ascending: false });
  if (status) {
    query = query.eq("status", status);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
},
  async getById(id) {
    const { data, error } = await supabase
      .from("washing_orders")
      .select(`id, customer_name, phone, status, received_at, finished_at, notes, services ( name, price )`)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id, status) {
    const updateData = { status };
    if (status === "selesai") {
      updateData.finished_at = new Date().toISOString();
    }
    const { data, error } = await supabase
      .from("washing_orders")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("washing_orders").delete().eq("id", id);
    if (error) throw error;
    return { message: "Order deleted" };
  },
};
