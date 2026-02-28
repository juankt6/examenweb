using HOSPITAL.Models;
using Microsoft.EntityFrameworkCore;

namespace HOSPITAL.Models
{
    public class HospitalDBContext : DbContext
    {
        public HospitalDBContext(DbContextOptions<HospitalDBContext> options) : base(options) { }

        // Aquí le decimos que estas clases serán tablas en la BD
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Doctor> Doctores { get; set; }
        public DbSet<Cita> Citas { get; set; }
    }
}