namespace ContactCenter.API.Models
{
    public class Client
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime JoinedQueue { get; set; }
    public int WaitTime { get; set; } // Nueva propiedad
}

}