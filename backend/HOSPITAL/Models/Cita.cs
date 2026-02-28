namespace HOSPITAL.Models
{
    public class Cita
    {
        public int CitaId { get; set; }
        public DateTime Fecha { get; set; }
        public string Motivo { get; set; }
        public int PacienteId { get; set; }
        public int DoctorId { get; set; }
        public Paciente? Paciente { get; set; }
        public Doctor? Doctor { get; set; }
    }
}