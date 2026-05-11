// src/features/Settings/components/TeamSection.jsx

const TeamSection = ({ team }) => (
  <section
    id="team"
    className="bg-surface-container-lowest overflow-hidden rounded-2xl shadow-sm"
  >
    <div className="p-8 border-b border-surface-container-low flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-on-surface">Team Management</h2>
        <p className="text-sm text-on-surface-variant">
          {team.memberCount} active members with administrative access
        </p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-bold rounded-xl text-xs hover:bg-primary hover:text-white transition-all">
        <span className="material-symbols-outlined text-sm">person_add</span>
        Invite Member
      </button>
    </div>

    <div className="divide-y divide-surface-container-low">
      {team.members.map((member) => (
        <div
          key={member.id}
          className="p-6 flex items-center justify-between hover:bg-surface-bright transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-on-surface">{member.name}</p>
              <p className="text-xs text-on-surface-variant">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <span
              className={`px-3 py-1 ${member.roleClass} text-[10px] font-bold uppercase tracking-wider rounded-full`}
            >
              {member.role}
            </span>
            <button className="p-2 text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TeamSection;