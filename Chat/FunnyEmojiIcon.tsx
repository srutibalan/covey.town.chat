import React from "react";

interface FunnyEmojiProps {
  title: string;
}

const FunnyEmojiIcon = ({title}: FunnyEmojiProps) => (
  <svg width={18} height={18}>
    <title>{title}</title>
    <g fill="#979797" fillRule="evenodd">
      <path
        d="M9 .947C4.56.947.947 4.56.947 9c0 4.441 3.613 8.053 8.053 8.053 4.44 0 8.053-3.612 8.053-8.053C17.053 4.56 13.44.947 9 .947M9 18a8.943 8.943 0 01-6.364-2.636A8.937 8.937 0 010 9.001c0-2.404.936-4.664 2.636-6.364A8.939 8.939 0 019 0a8.94 8.94 0 016.364 2.637A8.94 8.94 0 0118 9a8.94 8.94 0 01-2.636 6.363A8.942 8.942 0 019 18"/>
      <path
        d="M13.957 6.632h-3.282a1.877 1.877 0 01-.217-1.32l.003-.01c.04-.199.112-.389.215-.565h3.282c.167.287.253.61.253.947 0 .337-.087.66-.253.948zm-6.631 0H4.043a1.877 1.877 0 01-.253-.948c0-.336.087-.661.253-.947h3.283c.102.176.174.366.215.564l.003.012a1.886 1.886 0 01-.217 1.319h-.001zm7.263-2.654a.473.473 0 00-.379-.19h-3.789a.475.475 0 00-.379.19 2.833 2.833 0 00-.406.758h-1.27a2.841 2.841 0 00-.408-.759.473.473 0 00-.38-.19H3.79a.475.475 0 00-.379.19 2.817 2.817 0 00-.568 1.706c0 .622.197 1.211.568 1.706.09.12.23.19.38.19h3.789c.149 0 .289-.07.379-.19a2.816 2.816 0 00.568-1.705h.948c0 .62.197 1.21.568 1.706.09.12.23.19.379.19h3.79c.148 0 .288-.07.378-.19a2.816 2.816 0 00.569-1.705c0-.62-.197-1.21-.569-1.706v-.001zM9 15.158a6.162 6.162 0 01-6.074-5.133.474.474 0 01.935-.157 5.192 5.192 0 005.138 4.342c.916 0 1.817-.241 2.605-.698a.474.474 0 01.475.82A6.158 6.158 0 019 15.156v.002z"/>
    </g>
  </svg>
);

export default FunnyEmojiIcon;

