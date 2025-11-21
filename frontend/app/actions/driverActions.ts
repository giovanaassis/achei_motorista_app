"use server";

export async function createDriver(formData: FormData) {
  const rawData = Object.fromEntries(formData);

  console.log("criando", rawData);
  return { success: true };
}

export async function updateDriver(formData: FormData) {
  const rawData = Object.fromEntries(formData);
  //   const availability = formData.getAll("driver_availability");

  console.log("atualizando", rawData);
  return { success: true };
}
