import React, { useEffect, useRef } from "react";
import styled from 'styled-components'
import Jazzicon from "jazzicon";
import bs58 from "bs58";
import { PublicKey } from "@solana/web3.js";

interface IdenticonProps {
  address?: string | PublicKey;
  size?: number;
  className?: string;
}

export const Identicon = (props: IdenticonProps) => {
  const { className, size } = props;
  const address =
    typeof props.address === "string"
      ? props.address
      : props.address?.toBase58();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.className = className || "";
      ref.current.appendChild(
        Jazzicon(
          size || 16,
          parseInt(bs58.decode(address).toString("hex").slice(5, 15), 16)
        )
      );
    }
  }, [address, className, size]);

  return (
    <StyledIdenticon ref={ref as any} />
  );
};

const StyledIdenticon = styled.div`
  display: flex;
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  margin: 0.2rem 0.2rem 0.2rem 0.1rem;
  /* background-color: ${({ theme }) => theme.bg4}; */
`