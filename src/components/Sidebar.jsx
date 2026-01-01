import React from "react";

export default function Sidebar({ links }) {
  return (
    <aside className="sidebar">
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
