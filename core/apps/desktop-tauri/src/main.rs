// Multiversa Core — Tauri entrypoint (scaffold)
// Reemplaza el spawn del CLI de Hermes/Electron por un std::process::Command.
use std::process::Command;

#[tauri::command]
fn boot_core() -> String {
    // Equivalente al subprocess de Electron: invoca el binario Multiversa Core.
    let status = Command::new("multiversa-core")
        .arg("status")
        .output();
    match status {
        Ok(o) => String::from_utf8_lossy(&o.stdout).to_string(),
        Err(e) => format!("core no disponible: {}", e),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![boot_core])
        .run(tauri::generate_context!())
        .expect("error al correr Multiversa Core");
}
