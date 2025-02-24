namespace ContactCenter.API.Models
{
    public class Agent
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public AgentStatus Status { get; set; }
        public DateTime LastStatusChange { get; set; }
    }

    public enum AgentStatus
    {
        Available,
        InCall,
        OnBreak,
        Offline
    }
}

// Models/Client.cs
