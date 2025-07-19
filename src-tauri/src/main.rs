// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use tauri::{command, State};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

// AI Bridge Communication Types
#[derive(Debug, Serialize, Deserialize)]
struct AICommand {
    id: String,
    command: String,
    parameters: HashMap<String, serde_json::Value>,
    timestamp: u64,
}

#[derive(Debug, Serialize, Deserialize)]
struct AIResponse {
    id: String,
    success: bool,
    result: Option<serde_json::Value>,
    error: Option<String>,
    timestamp: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct WorkflowState {
    id: String,
    name: String,
    status: String,
    progress: f32,
    steps: Vec<String>,
}

// Application State
struct AppState {
    ai_bridge_url: String,
    workflows: std::sync::Mutex<HashMap<String, WorkflowState>>,
}

// Tauri Commands
#[command]
async fn execute_ai_command(
    command: String,
    parameters: HashMap<String, serde_json::Value>,
    _state: State<'_, AppState>,
) -> Result<AIResponse, String> {
    let command_id = Uuid::new_v4().to_string();
    let timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_secs();

    let ai_command = AICommand {
        id: command_id.clone(),
        command,
        parameters,
        timestamp,
    };

    // TODO: Send command to AI Bridge
    println!("Executing AI command: {:?}", ai_command);

    // Mock response for now
    Ok(AIResponse {
        id: command_id,
        success: true,
        result: Some(serde_json::json!({"message": "Command executed successfully"})),
        error: None,
        timestamp,
    })
}

#[command]
async fn get_workflow_status(
    workflow_id: String,
    state: State<'_, AppState>,
) -> Result<Option<WorkflowState>, String> {
    let workflows = state.workflows.lock().unwrap();
    Ok(workflows.get(&workflow_id).cloned())
}

#[command]
async fn create_workflow(
    name: String,
    state: State<'_, AppState>,
) -> Result<WorkflowState, String> {
    let workflow_id = Uuid::new_v4().to_string();
    let workflow = WorkflowState {
        id: workflow_id.clone(),
        name,
        status: "created".to_string(),
        progress: 0.0,
        steps: vec![],
    };

    let mut workflows = state.workflows.lock().unwrap();
    workflows.insert(workflow_id, workflow.clone());

    Ok(workflow)
}

#[command]
async fn check_ai_bridge_connection(
    state: State<'_, AppState>,
) -> Result<bool, String> {
    // TODO: Implement actual connection check
    println!("Checking AI Bridge connection to: {}", state.ai_bridge_url);
    Ok(true)
}

#[command]
async fn get_system_info() -> Result<HashMap<String, String>, String> {
    let mut info = HashMap::new();
    info.insert("platform".to_string(), std::env::consts::OS.to_string());
    info.insert("arch".to_string(), std::env::consts::ARCH.to_string());
    info.insert("version".to_string(), "0.1.0-alpha".to_string());
    Ok(info)
}

fn main() {
    tauri::Builder::default()
        .manage(AppState {
            ai_bridge_url: "http://localhost:8000".to_string(),
            workflows: std::sync::Mutex::new(HashMap::new()),
        })
        .invoke_handler(tauri::generate_handler![
            execute_ai_command,
            get_workflow_status,
            create_workflow,
            check_ai_bridge_connection,
            get_system_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}