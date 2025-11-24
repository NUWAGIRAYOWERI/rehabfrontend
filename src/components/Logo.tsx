export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="h-12 w-12"
        aria-hidden="true"
      >
        {/* Sun */}
        <circle cx="50" cy="65" r="18" fill="hsl(var(--accent))" />

        {/* Sun Rays */}
        <g fill="hsl(var(--accent))">
            <path d="M 30 55 L 25 53" stroke="hsl(var(--accent))" strokeWidth="2.5" />
            <path d="M 22 65 L 17 65" stroke="hsl(var(--accent))" strokeWidth="2.5" />
            <path d="M 30 75 L 25 77" stroke="hsl(var(--accent))" strokeWidth="2.5" />
            <path d="M 70 55 L 75 53" stroke="hsl(var(--accent))" strokeWidth="2.5" />
            <path d="M 78 65 L 83 65" stroke="hsl(var(--accent))" strokeWidth="2.5" />
            <path d="M 70 75 L 75 77" stroke="hsl(var(--accent))" strokeWidth="2.5" />
        </g>
        
        {/* Ground */}
        <path d="M25,80 C35,70 45,70 50,72 C55,70 65,70 75,80 L25,80 Z" fill="hsl(var(--primary))"/>
        
        {/* Person/Tree Trunk */}
        <path 
          d="M50,72 C40,60 40,40 50,30 C60,40 60,60 50,72 Z"
          fill="hsl(var(--primary))"
        />
        {/* Person arms/branches */}
        <path 
          d="M50,35 C40,25 25,25 38,15 C45,30 50,35 50,35 Z"
          fill="hsl(var(--primary))"
        />
         <path 
          d="M50,35 C60,25 75,25 62,15 C55,30 50,35 50,35 Z"
          fill="hsl(var(--primary))"
        />
         {/* Head left */}
        <circle cx="43" cy="22" r="4" fill="hsl(var(--primary))" />

        {/* Person right */}
        <g transform="translate(15, 5)">
            <path d="M50,67 C55,60 60,50 65,45 C70,55 65,65 55,67 Z" fill="hsl(var(--primary))" />
            <circle cx="63" cy="40" r="4" fill="hsl(var(--primary))" />
        </g>


        {/* Leaves */}
        <g fill="hsl(var(--primary))">
          <ellipse cx="50" cy="8" rx="4" ry="5" />
          <ellipse cx="60" cy="10" rx="4" ry="5" transform="rotate(30 60 10)" />
          <ellipse cx="40" cy="10" rx="4" ry="5" transform="rotate(-30 40 10)" />
          <ellipse cx="70" cy="18" rx="4" ry="5" transform="rotate(60 70 18)" />
          <ellipse cx="30" cy="18" rx="4" ry="5" transform="rotate(-60 30 18)" />
          <ellipse cx="75" cy="28" rx="4" ry="5" transform="rotate(80 75 28)" />
          <ellipse cx="25" cy="28" rx="4"ry="5" transform="rotate(-80 25 28)" />
          
          <ellipse cx="55" cy="15" rx="4" ry="5" transform="rotate(15 55 15)" />
          <ellipse cx="45" cy="15" rx="4" ry="5" transform="rotate(-15 45 15)" />

          <ellipse cx="65" cy="24" rx="4" ry="5" transform="rotate(45 65 24)" />
          <ellipse cx="35" cy="24" rx="4" ry="5" transform="rotate(-45 35 24)" />
        </g>

      </svg>
      <div className="flex flex-col">
        <span className="font-headline text-xl font-bold text-foreground">
          KIWENDA
        </span>
        <span className="text-xs font-semibold text-foreground/80 tracking-widest -mt-1">
          REHABILITATION CENTRE AND CLINIC
        </span>
      </div>
    </div>
  );
}
