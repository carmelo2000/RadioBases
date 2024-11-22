<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "radiobases";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consultar las radiobases
$sql = "SELECT id, latitude, longitude, type FROM radiobases";
$result = $conn->query($sql);

$radiobases = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $radiobases[] = [
            'id' => $row['id'],
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude'],
            'type' => $row['type']
        ];
    }
}

// Cerrar la conexión
$conn->close();

// Devolver los datos en formato JSON
echo json_encode($radiobases);
?>
