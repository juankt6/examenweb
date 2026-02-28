namespace HOSPITAL.Models
{
    public class Paciente
    {
        public int PacienteId { get; set; } // .NET entiende que esto es la llave primaria
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Telefono { get; set; }
    }
}
